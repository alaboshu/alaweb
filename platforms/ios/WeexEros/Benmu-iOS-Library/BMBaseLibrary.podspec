#
#  Be sure to run `pod spec lint XDPodDemo.podspec' to ensure this is a
#  valid spec and to remove all comments including this before submitting the spec.
#
#  To learn more about Podspec attributes see http://docs.cocoapods.org/specification.html
#  To see working Podspecs in the CocoaPods repo see https://github.com/CocoaPods/Specs/
#

Pod::Spec.new do |s|

  # ―――  Spec Metadata  ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  These will help people to find your library, and whilst it
  #  can feel like a chore to fill in it's definitely to your advantage. The
  #  summary should be tweet-length, and the description more in depth.
  #

  s.name         = "BMBaseLibrary"
  s.version      = "1.1.8"
  s.summary      = "本木医疗 iOS App 所需基础库"

  # This description is used to generate tags and improve search results.
  #   * Think: What does it do? Why did you write it? What is the focus?
  #   * Try to keep it short, snappy and to the point.
  #   * Write the description between the DESC delimiters below.
  #   * Finally, don't worry about the indent, CocoaPods strips it!
  s.description         = <<-DESC
                           本木 iOS常用的基础库
                         DESC

  s.homepage     = "http://EXAMPLE/BMBaseLibrary"
  # s.screenshots  = "www.example.com/screenshots_1.gif", "www.example.com/screenshots_2.gif"


  # ―――  Spec License  ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  Licensing your code is important. See http://choosealicense.com for more info.
  #  CocoaPods will detect a license file if there is a named LICENSE*
  #  Popular ones are 'MIT', 'BSD' and 'Apache License, Version 2.0'.
  #

  s.license      = "MIT"
 # s.license      = { :type => "MIT"}


  # ――― Author Metadata  ――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  Specify the authors of the library, with email addresses. Email addresses
  #  of the authors are extracted from the SCM log. E.g. $ git log. CocoaPods also
  #  accepts just a name if you'd rather not provide an email address.
  #
  #  Specify a social_media_url where others can refer to, for example a twitter
  #  profile URL.
  #

  s.author             = { "xionghuayu" => "xionghuayu@benmu-health.com" }
  # Or just: s.author    = "xionghuayu"
  # s.authors            = { "xionghuayu" => "xionghuayu@benmu-health.com" }
  # s.social_media_url   = "http://twitter.com/xionghuayu"

  # ――― Platform Specifics ――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  If this Pod runs only on iOS or OS X, then specify the platform and
  #  the deployment target. You can optionally include the target after the platform.
  #

  # s.platform     = :ios
  s.platform     = :ios, "8.0"

  #  When using multiple platforms
  s.ios.deployment_target = "8.0"
  # s.osx.deployment_target = "10.7"
  # s.watchos.deployment_target = "2.0"
  # s.tvos.deployment_target = "9.0"


  # ――― Source Location ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  Specify the location from where the source should be retrieved.
  #  Supports git, hg, bzr, svn and HTTP.
  #

  s.source       = { :git => "http://git.benmu-health.org/fe/Benmu-iOS-Library.git", :branch => "WeexEros" }


  # ――― Source Code ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  CocoaPods is smart about how it includes source code. For source files
  #  giving a folder will include any swift, h, m, mm, c & cpp files.
  #  For header files it will include any header in the folder.
  #  Not including the public_header_files will make all headers public.
  #

  # s.source_files  = "Classes", "Classes/**/*.{h,m}"
  # s.exclude_files = "Classes/Exclude"

  # s.public_header_files = "Classes/**/*.h"


  # ――― Resources ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  A list of resources included with the Pod. These are copied into the
  #  target bundle with a build phase script. Anything else will be cleaned.
  #  You can preserve files from being cleaned, please don't preserve
  #  non-essential files like tests, examples and documentation.
  #

  # s.resource  = "icon.png"
  # s.resources = "Resources/*.png"

  # s.preserve_paths = "FilesToSave", "MoreFilesToSave"


  # ――― Project Linking ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  Link your library with frameworks, or libraries. Libraries do not include
  #  the lib prefix of their name.
  #

  # s.framework  = "SomeFramework"
  # s.frameworks = "SomeFramework", "AnotherFramework"

  # s.library   = "iconv"
  # s.libraries = "iconv", "xml2"


  # ――― Project Settings ――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  #
  #  If your library depends on compiler flags you can set them in the xcconfig hash
  #  where they will only apply to your library. If you depend on other Podspecs
  #  you can include multiple dependencies to ensure it works.

  s.requires_arc = true

  # s.xcconfig = { "HEADER_SEARCH_PATHS" => "$(SDKROOT)/usr/include/libxml2" }
  # s.dependency "JSONKit", "~> 1.4"


 s.user_target_xcconfig  = { 'FRAMEWORK_SEARCH_PATHS' => "'$(PODS_ROOT)/BMBaseLibrary/'" }



#本木自定义转场动画
 s.subspec 'BMTransition' do |ss|
    ss.source_files  = "BMTransition/*.{c,h,m,mm,S}"
    ss.public_header_files = "BMTransition/*.h"
    ss.requires_arc  = true
  end

#Weex插件商城
 s.subspec 'WeexPlugins' do |ss|
   ss.source_files  = "Weexplugin/**/*.{h,m,mm}"
   #s.exclude_files = "Classes/Exclude"
   ss.resources = "Weexplugin/Resources/*"

   ss.public_header_files = "Weexplugin/**/*.h"

   ss.requires_arc = true
   #s.xcconfig = { "FRAMEWORK_SEARCH_PATHS" => "$(SDKROOT)/TRemoteDebugger" }
   ss.dependency 'AMap2DMap', '4.6.0'
   ss.dependency 'AMapSearch', '4.5.0'
   ss.dependency 'AMapLocation', '2.5.0'
  end



# Debug 相关类
 s.subspec 'BMDebug' do |ss|
    #ss.xcconfig = { "GCC_PREPROCESSOR_DEFINITIONS" => 'DebugVersion=1 TestVersion=0 AppStoreVersion=0' }
    ss.source_files  = "BMDebug/**/*.{c,h,m,mm,S}"
    ss.public_header_files = "BMDebug/**/*.h"
    ss.requires_arc  = true
  end

# Device信息
 s.subspec 'BMDevice' do |ss|
    ss.source_files  = "BMDevice/*.{c,h,m,mm,S}"
    ss.frameworks    = "Security"
    ss.public_header_files = "BMDevice/*.h"
    ss.requires_arc  = false
  end

# 对iOS系统类的拓展
 s.subspec 'BMExtension' do |ss|
    ss.source_files  = "BMExtension/**/*.{c,h,m,mm,S}"
    ss.public_header_files = "BMExtension/**/*.h"
    ss.requires_arc  = true
  end


# 对Weex系统类的拓展
 s.subspec 'BMWeexExtension' do |ss|
    ss.source_files  = "BMWeexExtension/*.{c,h,m,mm,S}"
    ss.public_header_files = "BMWeexExtension/*.h"
    ss.resources = 'BMWeexExtension/Resources/bm-base.js','BMWeexExtension/Resources/arrowInKeyboard@2x.png'
    ss.requires_arc  = true
  end

# 本木Controller类
 s.subspec 'BMController' do |ss|
    ss.source_files  = "BMController/**/*.{c,h,m,mm,S}"
    ss.public_header_files = "BMController/**/*.h"
    ss.resources = 'BMController/Resources/*.png'
    ss.requires_arc  = true
  end


#本木Network类
s.subspec 'BMNetwork' do |ss|
    ss.source_files  = "BMNetwork/**/*.{c,h,m,mm,S}"
    ss.public_header_files = "BMNetwork/**/*.h"
    ss.requires_arc  = true
  end



#本木Weex Module
s.subspec 'BMModule' do |ss|
    ss.source_files  = "BMModule/**/*.{c,h,m,mm,S}"
    ss.public_header_files = "BMModule/**/*.h"
    ss.resources = 'BMModule/Modal/SVProgressHUD/SVProgressHUD.bundle'
    ss.requires_arc  = true
    ss.dependency "Realm",'3.1.0'
    ss.dependency "BindingX",'1.0.1'
  end



#本木Weex BMManager
s.subspec 'BMManager' do |ss|
    ss.source_files  = "BMManager/**/*.{c,h,m,mm,S}"
    ss.public_header_files = "BMManager/**/*.h"
    ss.resources = 'BMManager/Resources/*.png'
    ss.requires_arc  = true
  end


# 本木自定义Handler
 s.subspec 'BMHandler' do |ss|
    ss.source_files  = "BMHandler/*.{c,h,m,mm,S}"
    ss.public_header_files = "BMHandler/*.h"
    ss.requires_arc  = true
  end

  # 本木自定义CustomUI
 s.subspec 'BMCustomUI' do |ss|
    ss.source_files  = "BMCustomUI/**/*.{c,h,m,mm,S}"
    ss.public_header_files = "BMCustomUI/**/*.h"
    ss.requires_arc  = true
  end


# 本木自定义组件
 s.subspec 'BMComponent' do |ss|
    ss.source_files  = "BMComponent/**/*.{c,h,m,mm,S}"
    ss.public_header_files = "BMComponent/**/*.h"
    ss.requires_arc  = true
    ss.resources = 'BMComponent/Calendar/Resources/*.png','BMComponent/Chart/Resources/bm-chart.html','BMComponent/Chart/Resources/echarts.min.js'
    ss.dependency 'FSCalendar','2.7.8'
    ss.dependency 'YYText', '1.0.7'
  end

 #本木自定义组件
 s.subspec 'BMModel' do |ss|
    ss.source_files  = "BMModel/*.{c,h,m,mm,S}"
    ss.public_header_files = "BMModel/*.h"
    ss.requires_arc  = true
  end

#ErosApp
s.subspec 'ErosApp' do |ss|
    ss.source_files  = "ErosApp/**/*.{c,h,m,mm,S,pch}"
    ss.public_header_files = "ErosApp/**/*.h"
    ss.requires_arc  = true
    ss.prefix_header_file = 'ErosApp/ErosDefine/PrefixHeader.pch'
  end

#本木Weex BMRoutes
s.subspec 'BMRoutes' do |ss|
    ss.source_files  = "BMRoutes/*.{c,h,m,mm,S}"
    ss.public_header_files = "BMRoutes/*.h"
    ss.requires_arc  = true
    ss.dependency "JLRoutes",'2.0.5'
  end

end
