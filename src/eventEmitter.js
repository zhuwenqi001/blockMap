//参考：https://github.com/sunyongjian/blog/issues/27
class EventEmitter {
  _event = {}

  on(eventName, handle) {
    let listeners = this._event[eventName]; //注册事件：为_event对象扩展名称为事件名的属性。
    if (!listeners || !listeners.length) { //为事件添加方法 接受到第一个方法，初始化数组，后面的方法直接push
      this._event[eventName] = [handle];
      return;
    }
    listeners.push(handle);
  }

  off(eventName, handle) { //为该事件 解除一个对应的方法
    let listeners = this._event[eventName];
    this._event[eventName] = listeners.filter(l => l !== handle);
  }

  emit(eventName, ...args) {
    const listeners = this._event[eventName]; //注册事件：为_event对象扩展名称为事件名的属性。
    if (listeners && listeners.length) { //检测属性对应的方法，由on添加
      for (const l of listeners) { //执行所有方法 集成后为单页应用，不存在执行方法未定义
        l(...args);
      }
    }
  }
}
const event = new EventEmitter();
export {
  event
};