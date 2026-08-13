// Immutable domain model for the AuditLog entity.

/**
 * A frozen AuditLog record identified by a stable integer id.
 */
export class AuditLog {
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
   * @returns {AuditLog}
   */
  rename(name) {
    return new AuditLog({ ...this, name });
  }

  /**
   * Return a copy with the amount replaced.
   * @param {number} amountCents
   * @returns {AuditLog}
   */
  withAmount(amountCents) {
    return new AuditLog({ ...this, amountCents });
  }

  /**
   * Return an inactive copy of this record.
   * @returns {AuditLog}
   */
  deactivate() {
    return new AuditLog({ ...this, active: false });
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
    return `AuditLog(#${this.id}, ${this.name}, ${state})`;
  }
}
