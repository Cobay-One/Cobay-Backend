// Immutable domain model for the Shipment entity.

/**
 * A frozen Shipment record identified by a stable integer id.
 */
export class Shipment {
  /**
   * @param {{ id: number, name: string, amountCents?: number, active?: boolean }} attrs
   */
  constructor({ id, name, amountCents = 0, active = true }) {
    this.id = id;
    this.name = name;
    this.amountCents = amountCents;
    this.active = active;
    Object.freeze(this);
  }

  /**
   * Return a copy of this record with a new name.
   * @param {string} name
   * @returns {Shipment}
   */
  rename(name) {
    return new Shipment({ ...this, name });
  }

  /**
   * Return a copy with the amount replaced.
   * @param {number} amountCents
   * @returns {Shipment}
   */
  withAmount(amountCents) {
    return new Shipment({ ...this, amountCents });
  }

  /**
   * Return an inactive copy of this record.
   * @returns {Shipment}
   */
  deactivate() {
    return new Shipment({ ...this, active: false });
  }

  /**
   * Return true when the amount is zero.
   * @returns {boolean}
   */
  isFree() {
    return this.amountCents === 0;
  }

  /**
   * Return a human-readable label for logs and displays.
   * @returns {string}
   */
  label() {
    const state = this.active ? "active" : "inactive";
    return `Shipment(#${this.id}, ${this.name}, ${state})`;
  }
}
