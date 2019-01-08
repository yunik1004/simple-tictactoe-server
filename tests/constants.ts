export const TESTPORT_PLAYER = 3330
export const TESTPORT_ROOM = 3331

export function TESTURI (port: number): string {
  return 'http://localhost:' + port
}
