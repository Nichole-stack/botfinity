import { createConfig, http } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import { monadTestnet } from './monad'

export const wagmiConfig = createConfig({
  chains: [monadTestnet],
  connectors: [
    metaMask({
      dappMetadata: {
        name: 'Botfinity',
        url: 'https://botfinity.app',
      },
    }),
  ],
  transports: {
    [monadTestnet.id]: http(),
  },
})
