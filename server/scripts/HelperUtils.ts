export class HelperUtils{
  static getValue<T, Z>(fn: () => T) {
    try {
      let value = fn();
      return value;
    } catch (e) {
      return;

    }
  }
}
