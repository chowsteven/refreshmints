interface HoldersPerTokenCount {
  tokenCount: number;
  ownerCount: number;
}

export interface HoldersInfo {
  ownersDistribution: Array<HoldersPerTokenCount>;
}
