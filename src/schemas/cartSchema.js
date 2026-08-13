// Data-transfer objects for the Cart entity.

/**
 * Normalise a create request, applying defaults and trimming the name.
 * @param {{ name: string, amountCents?: number }} payload
 * @returns {{ name: string, amountCents: number }}
 */
export function createRequest(payload) {
  return {
    name: String(payload.name ?? "").trim(),
    amountCents: Number(payload.amountCents ?? 0),
  };
}

/**
 * Serialise a Cart into a plain response object.
 * @param {{ id: number, name: string, amountCents: number, active: boolean }} entity
 * @returns {{ id: number, name: string, amountCents: number, active: boolean }}
 */
export function toResponse(entity) {
  return {
    id: entity.id,
    name: entity.name,
    amountCents: entity.amountCents,
    active: entity.active,
  };
}
