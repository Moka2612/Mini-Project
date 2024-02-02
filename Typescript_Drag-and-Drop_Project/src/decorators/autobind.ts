// Autobind decorator
export function Autobind(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originaMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originaMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
