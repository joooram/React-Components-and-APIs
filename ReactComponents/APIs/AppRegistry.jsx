import {Text, AppRegistry} from 'react-native';

const App = () => (
  <View>
    <Text>App1</Text>
  </View>
);

AppRegistry.registerComponent('Appname', () => App);
// static getAppKeys(): string[];
// static getRegistry(): {sections: string[]; runnables: Runnable[]};
// static getRunnable(appKey: string): : Runnable | undefined;
// static getSectionKeys(): string[];
// static getSections(): Record<string, Runnable>;
// static registerCancellableHeadlessTask(
// taskKey: string,
// taskProvider: TaskProvider,
// taskCancelProvider: TaskCancelProvider,
// );
// static registerComponent(
//  appKey: string,
//  getComponentFunc: ComponentProvider,
//  section?: boolean,
// ): string;
// static registerConfig(config: AppConfig[]);
// static registerHeadlessTask(
//  taskKey: string,
//  taskProvider: TaskProvider,
//);
// static registerRunnable(appKey: string, func: Runnable): string;
// static registerSection(
//  appKey: string,
//  component: ComponentProvider,
// );
// static runApplication(appKey: string, appParameters: any): void;
// static setComponentProviderInstrumentationHook(
// hook: ComponentProviderInstrumentationHook,
//);
// static setWrapperComponentProvider(
// provider: WrapperComponentProvider,
// );
// static startHeadlessTask(taskId: number,taskKey: string,data: any,);
// static unmountApplicationComponentAtRootTag(rootTag: number);
// 