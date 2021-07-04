import { CACTUS_INTERVAL, CHARA_SIZE, CACTUS_SIZE } from './gameConsts.js'

const isOverwrap = (from1, to1, from2, to2) => {
  return from1 <= to2 && to1 >= from2
}
let lastCactusAddedMs = 0

/**
 * Judge whether add new cactus on stage or not.
 */
export const shouldAddCactus = () => {
  const now = Date.now()
  const interval = now - lastCactusAddedMs
  const shouldAdd =
    (interval - CACTUS_INTERVAL.MIN) /
      (CACTUS_INTERVAL.MAX - CACTUS_INTERVAL.MIN) >
    Math.random()
  if (shouldAdd) {
    lastCactusAddedMs = now
  }
  return shouldAdd
}

/**
 * exechit test and return list of cactuses that overwrap with charactor.
 * @param {Object} chara
 * @param {Object[]} cactuses
 * @returns {Object[]}
 */
export const getHitCactuses = (chara, cactuses) => {
  return cactuses.filter((cactus) => {
    return (
      isOverwrap(
        chara.x,
        chara.x + CHARA_SIZE.W,
        cactus.x,
        cactus.x + CACTUS_SIZE.W
      ) && isOverwrap(chara.y, chara.y + CHARA_SIZE.H, 0, cactus.h)
    )
  })
}
