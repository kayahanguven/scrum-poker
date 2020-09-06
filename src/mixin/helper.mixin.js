import fire from '../firebase'
import router from '@/router'

export function setDataToFirebase (reference, data) {
  fire.database().ref(reference).set(data)
}

export async function checkRoomAvailability (users) {
  const maxUserCountRef = fire.database().ref(`${router.currentRoute.params.id}/maxUserCount`)
  const maxUserCount = await (await maxUserCountRef.once('value')).val()

  return Number(maxUserCount) > users.length
}

export function generateRoomId () {
  const min = 10000
  const max = 99999

  return Math.floor(Math.random() * (max - min + 1)) + min
}
