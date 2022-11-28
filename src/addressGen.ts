const chars = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
] as const;

export default function (): string {
  let addr = "0x";
  for (var i = 0; i < 10; i++) {
    var idx = Math.floor(Math.random() * 16);
    addr += chars[idx];
  }
  return addr;
}
