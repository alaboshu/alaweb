### 安卓工程

Weex-eros Android框架工程
本部分主要面向android原生开发者，旨在介绍weex-eros-android框架的项目结构和设计思路，方便广大weex开发者进行weex原生拓展开发。

#### 一.功能介绍

weex-eros是在weex原生拓展的基础上，结合我团队具体项目业务场景，总结出来的一套易用性强，侵入性低，快速集成开发的框架，框架中集成内置module，包括路由，本地存储，网络请求，全局参数配置，事件发布订阅，调用摄像头等，基本涵盖大部分业务场景需求，且提供了自定义接口，方便开发者自定义实现。

#### 二.使用框架

目前提供了源码依赖的方式，这是我们比较推荐的方式。如果你使用Android Studio进行开发，你可将项目源码做为Moudle导入项目中，在app的build.gradle中添加如下依赖:
```
compile project(':wxframework')
```
关于gradle和maven的依赖方式，我们将以迅雷不及掩耳之势在后续更新放出。

三.项目目录结构

Eros项目的目录结构如下：
```
项目目录结构
·
|-- BMInitConfig                    initConfig
|-- BMWXApplication                 封装的Application
|-- BMWXEngine                      框架初始化引擎
|-- BMWXEnvironment                 框架上下文
|-- activity                        封装的activity，包括提供weex渲染和一些默认实现页面
     |-- AbstractWeexActivity
|-- adapter                         框架对功能模块具体实现类
     |-- router
     |-- DefaultImageAdapter
     |-- DefaultStorageAdapter
|-- constant                        常量类
|-- event                           处理与js交互的自定义事件
|-- extend                          weex原生的拓展
     |-- adapter
          | -- DefaultWXHttpAdapter 拓展weex原生IWXHttpAdapter
          |-- DefaultWXImageAdapter 拓展weex原生IWXImgLoaderAdapter
    |-- components                  自定义weex组件
    |-- module                      自定义weex module
|-- http                            http实现（默认使用okhttp）
|-- manager                         业务处理管理类
|-- model                           java beans
|-- utils                           utils
```

四.关键类
总览Eros项目的工程目录，有些类是我们需要特别注意的：

BMWXApplication
此类为Applcation的子类，将你项目的Application继承它，便可以自动完成Eros框架的初始化和内置moudle，component的注册，方便开发者快速集成。

```
public class BMWXApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
    }

    private void initWeex() {
        BMWXEngine.initialize(this, new BMInitConfig.Builder().isActiceInterceptor(Constant
                .INTERCEPTOR_ACTIVE).build());
    }
}
```

BMWXEngine
此类是Eros框架的初始化入口，请在你的项目入口调用initialize方法完成初始化。
```
public class App extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        BMWXEngine.initialize(this, new BMInitConfig.Builder().isActiceInterceptor(Constant
                .INTERCEPTOR_ACTIVE).build());
    }

}

```
BMWXEngine内部将完成weex框架的初始化和内置moudle，component的注册以Enviroment.config的参数配置。
```
    public static void initialize(Application context, BMInitConfig initConfig) {
        initPlatformConfig(context);
        initConing(initConfig);
        engineStart(context);
        registerBMComponentsAndModules(context);
        initHttpClient(context);
        initInterceptor(context, initConfig);
        initDispatchCenter();
    }
```
此外，为了方便于js端的数据交互，你可以通过BMInitConfig将一些参数放入全局环境中：
```
  HashMap<String,String> envs=new HashMap<>();
        envs.put("test","test");
        BMWXEngine.initialize(this, new BMInitConfig.Builder().setCustomerEnv(envs).build());
```

js端可以使用```weex.enviroment.config```  获取。


AbstractWeexActivity

此类为Application的子类，将你项目的Application继承它，便可以自动完成Eros框架的初始化和内置moudle，component的注册，方便开发者快速集成。
```
public class BMWXApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
    }

    private void initWeex() {
        BMWXEngine.initialize(this, new BMInitConfig.Builder().isActiceInterceptor(Constant
                .INTERCEPTOR_ACTIVE).build());
    }
}

```
#### 五.项目地址
目前Eros项目的框架部分已经完全开源，项目地址[https://github.com/aa453509345/WeexErosFramework],
另外WeexErosFramework项目所以来的WeexSDK是我们在Weex原生SDK的基础上，修复了原生SDK的部分bug所维护的SDK，项目地址：
[https://github.com/aa453509345/WeexSDK] ,目前Eros项目还在快速开发迭代中，对于功能复杂或自定义程度高度制定的场景支持可能还不够完善，我们会在后续版本中支持完善， 也希望广大weex开发者和开源爱好者提出建议，共同完善Eros。

有任何问题和建议的童鞋，请查看[Eros使用手册](https://karynsong.gitbooks.io/weex-eros/content/)
