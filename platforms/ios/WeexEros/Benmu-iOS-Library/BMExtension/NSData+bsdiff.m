//
//  NSData+bsdiff.m
//
//  Created by 窦静轩 on 16/6/27.
//  Copyright © 2016年 微票儿. All rights reserved.
//

#import "NSData+bsdiff.h"

static off_t offtin(u_char *buf)
{
    off_t y;
    
    y=buf[7]&0x7F;
    y=y*256;y+=buf[6];
    y=y*256;y+=buf[5];
    y=y*256;y+=buf[4];
    y=y*256;y+=buf[3];
    y=y*256;y+=buf[2];
    y=y*256;y+=buf[1];
    y=y*256;y+=buf[0];
    
    if(buf[7]&0x80) y=-y;
    
    return y;
}

static void split(off_t *I, off_t *V, off_t start, off_t len, off_t h)
{
    off_t i, j, k, x, tmp, jj, kk;
    
    if (len < 16) {
        for (k = start; k < start + len; k += j) {
            j = 1; x = V[I[k] + h];
            for (i = 1; k + i < start + len; i++) {
                if (V[I[k + i] + h] < x) {
                    x = V[I[k + i] + h];
                    j = 0;
                };
                if (V[I[k + i] + h] == x) {
                    tmp = I[k + j]; I[k + j] = I[k + i]; I[k + i] = tmp;
                    j++;
                };
            };
            for (i = 0; i < j; i++)
                V[I[k + i]] = k + j - 1;
            if (j == 1)
                I[k] = -1;
        };
        return;
    };
    
    x = V[I[start + len/2] + h];
    jj = 0; kk = 0;
    for (i = start; i < start + len; i++) {
        if (V[I[i] + h] < x)
            jj++;
        if (V[I[i] + h] == x)
            kk++;
    };
    jj += start; kk += jj;
    
    i = start; j = 0; k = 0;
    while (i < jj) {
        if (V[I[i] + h] < x) {
            i++;
        } else if (V[I[i] + h] == x) {
            tmp = I[i]; I[i] = I[jj + j]; I[jj + j] = tmp;
            j++;
        } else {
            tmp = I[i]; I[i] = I[kk + k]; I[kk + k] = tmp;
            k++;
        };
    };
    
    while (jj + j < kk) {
        if (V[I[jj + j] + h] == x) {
            j++;
        } else {
            tmp = I[jj + j]; I[jj + j] = I[kk + k]; I[kk + k] = tmp;
            k++;
        };
    };
    
    if (jj > start)
        split(I, V, start, jj - start, h);
    
    for (i = 0; i < kk - jj; i++)
        V[I[jj + i]] = kk - 1;
    if (jj == kk - 1)
        I[jj] = -1;
    
    if (start + len > kk)
        split(I, V, kk, start + len - kk, h);
}

static void qsufsort(off_t *I, off_t *V, u_char *old, off_t oldsize)
{
    off_t buckets[256];
    off_t i, h, len;
    
    /* count number of each byte  */
    for (i = 0; i < 256; i++)
        buckets[i] = 0;
    for (i = 0; i < oldsize; i++)
        buckets[old[i]]++;
    /* make buckets cumulative */
    for (i = 1; i < 256; i++)
        buckets[i] += buckets[i - 1];
    /* shift right by one */
    for (i = 255; i > 0; i--)
        buckets[i] = buckets[i - 1];
    buckets[0] = 0;
    /* at this point, buckets[c] is the number of bytes in the old file with
     * value less than c. */
    
    /* set up the sort order of the suffixes based solely on the first
     * character */
    for (i = 0; i < oldsize; i++)
        I[++buckets[old[i]]] = i;
    I[0] = oldsize;
    /* ? */
    for (i = 0; i < oldsize; i++)
        V[i] = buckets[old[i]];
    V[oldsize] = 0;
    /* forward any entries in the ordering which have the same initial
     * character */
    for (i = 1; i < 256; i++) {
        if (buckets[i] == buckets[i - 1] + 1)
            I[buckets[i]] = -1;
    }
    I[0] = -1;
    
    for (h = 1; I[0] != -(oldsize + 1); h += h) {
        len = 0;
        for (i = 0; i < oldsize + 1;) {
            if (I[i] < 0) {
                len -= I[i];
                i -= I[i];
            } else {
                if (len)
                    I[i - len] = -len;
                len = V[I[i]] + 1 - i;
                split(I, V, i, len, h);
                i += len;
                len = 0;
            }
        }
        if (len)
            I[i - len] = -len;
    };
    
    for (i = 0; i < oldsize + 1; i++) I[V[i]] = i;
}

static off_t matchlen(u_char *old, off_t oldsize, u_char *new, off_t newsize)
{
    off_t i;
    
    for (i = 0; (i < oldsize) && (i < newsize); i++)
    {
        if (old[i] != new[i])
            break;
    }
    
    return i;
}

static off_t search(off_t *I, u_char *old, off_t oldsize,
                    u_char *new, off_t newsize, off_t st, off_t en, off_t *pos)
{
    off_t x, y;
    
    if (en - st < 2) {
        x = matchlen(old + I[st], oldsize - I[st], new, newsize);
        y = matchlen(old + I[en], oldsize - I[en], new, newsize);
        
        if (x > y) {
            *pos = I[st];
            return x;
        } else {
            *pos = I[en];
            return y;
        }
    }
    
    x = st + (en - st)/2;
    if (memcmp(old + I[x], new, MIN(oldsize - I[x], newsize)) < 0) {
        return search(I, old, oldsize, new, newsize, x, en, pos);
    } else {
        return search(I, old, oldsize, new, newsize, st, x, pos);
    };
}

static void offtout(off_t x, u_char *buf)
{
    off_t y;
    
    if (x < 0)
        y = -x;
    else
        y = x;
    
    buf[0] = y % 256;
    y -= buf[0];
    y = y/256; buf[1] = y%256; y -= buf[1];
    y = y/256; buf[2] = y%256; y -= buf[2];
    y = y/256; buf[3] = y%256; y -= buf[3];
    y = y/256; buf[4] = y%256; y -= buf[4];
    y = y/256; buf[5] = y%256; y -= buf[5];
    y = y/256; buf[6] = y%256; y -= buf[6];
    y = y/256; buf[7] = y%256;
    
    if (x < 0)
        buf[7] |= 0x80;
}

@implementation NSData (bsdiff)
- (NSData *)diff:(NSData *)data {
    ssize_t oldsize, newsize;
    off_t dblen, eblen;
    off_t scan;                 /* position of current match in old file */
    off_t pos = 0;                  /* position of current match in new file */
    off_t len;                  /* length of current match */
    off_t lastscan;             /* position of previous match in old file */
    off_t lastpos;              /* position of previous match in new file */
    off_t lastoffset;           /* lastpos - lastscan */
    off_t oldscore, scsc;       /* temp variables in match search */
    off_t s, Sf, lenf, Sb, lenb;    /* temp vars in match extension */
    off_t overlap, Ss, lens;
    off_t i;
    u_char *db,*eb;             /* contents of diff, extra sections */
    u_char buf[8];
    u_char header[32];
    
    oldsize = [self length];
    
    off_t *I = malloc((oldsize + 1) * sizeof(off_t));
    off_t *V = malloc((oldsize + 1) * sizeof(off_t));
    
    NSMutableData *oldData = [self mutableCopy];
    u_char *old = (u_char *)[oldData mutableBytes];
    qsufsort(I, V, old, oldsize);
    free(V);
    
    newsize = [data length];
    NSMutableData *newData = [data mutableCopy];
    u_char *new = [newData mutableBytes];
    db = malloc(newsize + 1);
    eb = malloc(newsize + 1);
    dblen = 0;
    eblen = 0;
    
    NSMutableData *patch = [[NSMutableData alloc] initWithCapacity:oldsize + newsize + 1024];
    memcpy(header, "BSDIFF40", 8);
    offtout(0, header + 8);
    offtout(0, header + 16);
    offtout(newsize, header + 24);
    [patch replaceBytesInRange:NSMakeRange(0, 32) withBytes:header];
    
    scan = 0;
    len = 0;
    lastscan = 0;
    lastpos = 0;
    lastoffset = 0;
    while (scan < newsize) {
        oldscore = 0;
        for (scsc = scan += len; scan < newsize; scan++) {
            /* 'oldscore' is the number of characters that match between the
             * substrings 'old[lastoffset + scan:lastoffset + scsc]' and
             * 'new[scan:scsc]'. */
            len = search(I, old, oldsize, new + scan, newsize - scan,
                         0, oldsize, &pos);
            
            /* If this match extends further than the last one, add any new
             * matching characters to 'oldscore'. */
            for (; scsc < scan + len; scsc++) {
                if ((scsc + lastoffset < oldsize) &&
                    (old[scsc + lastoffset] == new[scsc]))
                    oldscore++;
            }
            
            /* Choose this as our match if it contains more than eight
             * characters that would be wrong if matched with a forward
             * extension of the previous match instead. */
            if (((len == oldscore) && (len != 0)) ||
                (len > oldscore + 8))
                break;
            
            /* Since we're advancing 'scan' by 1, remove the character under it
             * from 'oldscore' if it matches. */
            if ((scan + lastoffset < oldsize) &&
                (old[scan + lastoffset] == new[scan]))
                oldscore--;
        }
        
        /* Skip this section if we found an exact match that would be
         * better serviced by a forward extension of the previous match. */
        if ((len != oldscore) || (scan == newsize)) {
            /* Figure out how far forward the previous match should be
             * extended... */
            s = 0;
            Sf = 0;
            lenf = 0;
            for (i = 0; (lastscan + i < scan) && (lastpos + i < oldsize);) {
                if (old[lastpos + i] == new[lastscan + i])
                    s++;
                i++;
                if (s * 2 - i > Sf * 2 - lenf) {
                    Sf = s;
                    lenf = i;
                }
            }
            
            /* ... and how far backwards the next match should be extended. */
            lenb = 0;
            if (scan < newsize) {
                s = 0;
                Sb = 0;
                for (i = 1; (scan >= lastscan + i) && (pos >= i); i++) {
                    if (old[pos - i] == new[scan - i])
                        s++;
                    if (s * 2 - i > Sb * 2 - lenb) {
                        Sb = s;
                        lenb = i;
                    }
                }
            }
            
            /* If there is an overlap between the extensions, find the best
             * dividing point in the middle and reset 'lenf' and 'lenb'
             * accordingly. */
            if (lastscan + lenf > scan - lenb) {
                overlap = (lastscan + lenf) - (scan - lenb);
                s = 0;
                Ss = 0;
                lens = 0;
                for (i = 0; i < overlap; i++) {
                    if (new[lastscan + lenf - overlap + i] ==
                        old[lastpos + lenf - overlap + i])
                        s++;
                    if (new[scan - lenb + i] == old[pos - lenb + i])
                        s--;
                    if (s > Ss) {
                        Ss = s;
                        lens = i + 1;
                    }
                }
                
                lenf += lens - overlap;
                lenb -= lens;
            }
            
            /* Write the diff data for the last match to the diff section... */
            for (i = 0; i < lenf; i++)
                db[dblen + i] = new[lastscan + i] - old[lastpos + i];
            /* ... and, if there's a gap between the extensions just
             * calculated, write the data in that gap to the extra section. */
            for (i = 0; i< (scan - lenb) - (lastscan + lenf); i++)
                eb[eblen + i] = new[lastscan + lenf + i];
            
            /* Update the diff and extra section lengths accordingly. */
            dblen += lenf;
            eblen += (scan - lenb) - (lastscan + lenf);
            
            /* Write the following triple of integers to the control section:
             *  - length of the diff
             *  - length of the extra section
             *  - offset between the end of the diff and the start of the next
             *      diff, in the old file
             */
            offtout(lenf, buf);
            [patch appendBytes:buf length:8];
            offtout((scan-lenb)-(lastscan+lenf),buf);
            [patch appendBytes:buf length:8];
            offtout((pos-lenb)-(lastpos+lenf),buf);
            [patch appendBytes:buf length:8];
            
            lastscan=scan-lenb;
            lastpos=pos-lenb;
            lastoffset=pos-scan;
        }
    }
    
    
    
    return nil;
}

- (NSData *)patch:(NSData *)patch {
    NSData * (^io_open)(NSData *data);
    ssize_t oldsize, newsize, cstart, dstart, estart;
    ssize_t bzctrllen, bzdatalen;
    u_char *header;
    off_t oldpos,newpos;
    off_t ctrl[3];
    long long lenread;
    off_t i;
    
    NSData *headerData = [patch subdataWithRange:NSMakeRange(0, 32)];
    NSData *headerVersion = [headerData subdataWithRange:NSMakeRange(0, 8)];
    if ([headerVersion isEqualToData:[@"BSDIFF40" dataUsingEncoding:NSASCIIStringEncoding]]) {
        io_open = ^(NSData *data) {
            int bzret;
            bz_stream stream = { 0 };
            stream.next_in = (char*)[data bytes];
            stream.avail_in = (u_int)[data length];
            
            const int buffer_size = 10000;
            NSMutableData * buffer = [NSMutableData dataWithLength:buffer_size];
            stream.next_out = [buffer mutableBytes];
            stream.avail_out = buffer_size;
            
            NSMutableData * decompressed = [NSMutableData data];
            
            BZ2_bzDecompressInit(&stream, 0, NO);
            @try {
                do {
                    bzret = BZ2_bzDecompress(&stream);
                  if (bzret != BZ_OK && bzret != BZ_STREAM_END) {
                       WXLogError(@"BZ2_bzDecompress");
                  }
//                        @throw [NSException exceptionWithName:@"bzip2" reason:@"BZ2_bzDecompress failed" userInfo:nil];
                  
                    [decompressed appendBytes:[buffer bytes] length:(buffer_size - stream.avail_out)];
                    stream.next_out = [buffer mutableBytes];
                    stream.avail_out = buffer_size;
                } while(bzret != BZ_STREAM_END);
            }
            @finally {
                BZ2_bzDecompressEnd(&stream);
            }
            
            return decompressed;
        };
    } else if ([headerVersion isEqualToData:[@"BSDIFN40" dataUsingEncoding:NSASCIIStringEncoding]]) {
        io_open = ^(NSData *data) {
            return data;
        };
    } else {
        return nil;
    }
    header = (u_char *)[headerData bytes];
    bzctrllen = offtin(header + 8);
    bzdatalen = offtin(header + 16);
    newsize = offtin(header + 24);
    
    if ((bzctrllen < 0) || (bzdatalen < 0) || (newsize < 0)) {
        return nil;
    }
    
    NSData *cstream = io_open([patch subdataWithRange:NSMakeRange(32, [patch length]-32)]);
    NSData *dstream = io_open([patch subdataWithRange:NSMakeRange(32 + bzctrllen, [patch length]-(32 + bzctrllen))]);
    NSData *estream = io_open([patch subdataWithRange:NSMakeRange(32 + bzctrllen + bzdatalen, [patch length]-(32 + bzctrllen + bzdatalen))]);
    
    oldsize = [self length];
    NSData *old = [NSData dataWithData:self];
    NSMutableData *new = [NSMutableData dataWithCapacity:newsize + 1];
    
    oldpos = 0; newpos = 0;
    cstart = 0; dstart = 0; estart = 0;
    while (newpos < newsize) {
        for (i = 0; i <= 2; i++) {
            NSData *c = [cstream subdataWithRange:NSMakeRange(cstart, 8)];
            lenread = [c length];
            if (lenread < 8) {
                return nil;
            }
            ctrl[i] = offtin((u_char *)[c bytes]);
            cstart += 8;
        }
        
        if (newpos + ctrl[0] > newsize) {
            return nil;
        }
        
        NSData *d = [dstream subdataWithRange:NSMakeRange(dstart, ctrl[0])];
        lenread = [d length];
        [new appendData:d];
        if (lenread < ctrl[0]) {
            return nil;
        }
        dstart += ctrl[0];
        
        u_char *new_bytes = [new mutableBytes];
        u_char *old_bytes = (u_char *)[old bytes];
        for (i = 0; i < ctrl[0]; i++) {
            if ((oldpos + i >= 0) && (oldpos + i < oldsize)) {
                new_bytes[newpos + i] += old_bytes[oldpos + i];
            }
        }
        
        newpos += ctrl[0];
        oldpos += ctrl[0];
        
        if (newpos + ctrl[1] > newsize) {
            return nil;
        }
        
        NSData *e = [estream subdataWithRange:NSMakeRange(estart, ctrl[1])];
        lenread = [e length];
        [new appendData:e];
        if (lenread < ctrl[1]) {
            return nil;
        }
        estart += ctrl[1];
        
        newpos += ctrl[1];
        oldpos += ctrl[2];
    }
    
    return [NSData dataWithData:new];
}

- (instancetype)initWithData:(NSData *)data andPatch:(NSData *)patch {
    self = [self initWithData:data];
    if (self) {
        self = [self patch:patch];
    }
    return self;
}

+ (NSData *)dataWithData:(NSData *)data andPatch:(NSData *)patch {
    return [data patch:patch];
}
@end
