import {
  SIDE_DEV_ID,
  SIDE_TEST_ID,
  NOBLE_DEV_ID,
  NOBLE_TEST_ID,
  AXELAR_DEV_ID,
  AXELAR_TEST_ID,
  BABYLON_TEST_ID
} from '@/ui/constants/chains/chainId';

export interface IBcChannels {
  [key: string]: {
    [key: string]: { channelId: string; portId: string };
  };
}

export const IBC_CHANNELS_SIDE_CHAIN_DEV: IBcChannels = {
  [NOBLE_DEV_ID]: {
    [SIDE_DEV_ID]: {
      channelId: 'channel-0',
      portId: 'transfer'
    },
    [NOBLE_DEV_ID]: {
      channelId: 'channel-155',
      portId: 'transfer'
    }
  },
  [AXELAR_DEV_ID]: {
    [SIDE_DEV_ID]: {
      channelId: 'channel-1',
      portId: 'transfer'
    },
    [AXELAR_DEV_ID]: {
      channelId: 'channel-465',
      portId: 'transfer'
    }
  }
};

export const IBC_CHANNELS_SIDE_CHAIN_TEST: IBcChannels = {
  [NOBLE_TEST_ID]: {
    [SIDE_TEST_ID]: {
      channelId: 'channel-2',
      portId: 'transfer'
    },
    [NOBLE_TEST_ID]: {
      channelId: 'channel-165',
      portId: 'transfer'
    }
  },
  [AXELAR_TEST_ID]: {
    [SIDE_TEST_ID]: {
      channelId: 'channel-1',
      portId: 'transfer'
    },
    [AXELAR_TEST_ID]: {
      channelId: 'channel-168',
      portId: 'transfer'
    }
  },
  [BABYLON_TEST_ID]: {
    [SIDE_TEST_ID]: {
      channelId: 'channel-2',
      portId: 'transfer'
    },
    [BABYLON_TEST_ID]: {
      channelId: 'channel-12',
      portId: 'transfer'
    }
  }
};

export const IBC_CHANNELS_SIDE_CHAIN_MAIN: IBcChannels = {};
