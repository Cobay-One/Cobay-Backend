// Immutable domain model for the Wishlist entity.

/**
 * A frozen Wishlist record identified by a stable integer id.
 */
export class Wishlist {
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
   * @returns {Wishlist}
   */
  rename(name) {
    return new Wishlist({ ...this, name });
  }

  /**
   * Return a copy with the amount replaced.
   * @param {number} amountCents
   * @returns {Wishlist}
   */
  withAmount(amountCents) {
    return new Wishlist({ ...this, amountCents });
  }

  /**
   * Return an inactive copy of this record.
   * @returns {Wishlist}
   */
  deactivate() {
    return new Wishlist({ ...this, active: false });
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
    return `Wishlist(#${this.id}, ${this.name}, ${state})`;
  }
}
