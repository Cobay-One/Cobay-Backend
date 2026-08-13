// Immutable domain model for the LedgerEntry entity.

/**
 * A frozen LedgerEntry record identified by a stable integer id.
 */
export class LedgerEntry {
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
   * @returns {LedgerEntry}
   */
  rename(name) {
    return new LedgerEntry({ ...this, name });
  }

  /**
   * Return a copy with the amount replaced.
   * @param {number} amountCents
   * @returns {LedgerEntry}
   */
  withAmount(amountCents) {
    return new LedgerEntry({ ...this, amountCents });
  }

  /**
   * Return an inactive copy of this record.
   * @returns {LedgerEntry}
   */
  deactivate() {
    return new LedgerEntry({ ...this, active: false });
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
    return `LedgerEntry(#${this.id}, ${this.name}, ${state})`;
  }
}
