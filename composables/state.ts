export function useCounter() {
  return useState('counter', () => 1)
}
