export const DynamicReferencePattern = {
  /**
   * Properties are static context values or objects provided by the system.<br>
   * Access child properties with dot (.) paths: <code>{object.property.subproperty}</code> etc.
   */
  property: /^\{[a-zA-Z0-9_.-]+}$/,
  /**
   * Variables are dynamic values named and assigned by custom logic.
   * Access child properties with dot (.) paths: <code>#object.property.subproperty</code> etc.
   */
  variable: /^#[a-zA-Z0-9_.-]+$/,
  /**
   * Properties are static context values or objects provided by the system.<br>
   * Access child properties with dot (.) paths: <code>{object.property.subproperty}</code> etc.
   */
  propertyFragment: /\{[a-zA-Z0-9_.-]+}/,
  /**
   * Variables are dynamic values named and assigned by custom logic.
   * Access child properties with dot (.) paths: <code>#object.property.subproperty</code> etc.
   */
  variableFragment: /#[a-z0-9_-]+(\.[a-zA-Z0-9_-]+)*/,
};
