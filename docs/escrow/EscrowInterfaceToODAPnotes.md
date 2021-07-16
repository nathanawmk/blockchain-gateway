

How does this escrow interface definition relate to the ODAP protocol? Well take Figure 3 of https://arxiv.org/pdf/2102.03933.pdf. The escrow interface's `lockFungibleTokens` or `lockNonFungibleTokens` functions can be used for part (2). Whereas the escrow interface's `unlockClaim` function can be used for part (8). 


Furthermore, we may be able to utilise this escrow definition to modify the ODAP steps to move ODAP towards a *non-custodial* and *trustless* version. See the follow re-writes of the steps of Figure 3 of https://arxiv.org/pdf/2102.03933.pdf, followed by a description of why I believe this re-write satisfies the *non-custodial* and *trustless* properties as well as maintaining the *atomic* and *crash-fault tolerant* prosperties.


Phase 0 & 1:

0. Alice = originator, she performs an asset-move request to G1 by adding a transaction onto Blockchain B1 to create a HashTimeLock escrow (as defined in this folder) for token T1 in Gateway’s G1 escrow contract. The escrow originId = Alice and destinationId= a DLT Specific Burn Address. Lets say the escrow has a timelock of 2 hours and a hash lock h. (Note that the token is not under the control of G1).
1.  G1 finds G2 on B2 and checks that G2 can print token T1 on B2.

Phase 2:

2. Skipped (from https://arxiv.org/pdf/2102.03933.pdf) -> as in this re-write, the asset is already locked in part 0.
3. Lock/Escrow Evidence: provided from G1 to G2, including the hashlock h.
4. Mint-Prepare: G2 now adds a transaction onto B2 that will print token T1 to Alice’s B2 address IFF a secret s is revealed where hash(s) = h AND this secret is reveal at a time < 2 hours - X (where X is our transaction confirmation on the blockchain safety interval). (Note that the token to be minted is not under the control of G2). 

&nbsp; &nbsp; 5A. Evidence-Receipt. (If evidence is not convincing, G1 starts again at part 1).

&nbsp; &nbsp; 5B. Evidence-Receiver: G1 records onto B1 the future new home of Token T1, should the escrow be claimed. (This used to be part 12, but has been moved up so that Alice can evaluate and show implicit agreement with it).

Phase 3 (this is a bit different to the previous Figure 3 version):

&nbsp; &nbsp; 6A. Secret reveal: If the evidence-receipt and evidence-receiver convinces Alice, then she is incentivised to reveal the secret s to G2. (If Alice is not convinced, she either will have to start again at phase 0, or inform G1 to find another partner gateway).

&nbsp; &nbsp; 6B. Commit-Prepare: G2 sends commit-prepare to G1 with the secret s included.

7. Prepare-Acknowledge: from G1 to G2
8. Finalise-Lock: G1 claims from the escrow, sending B1’s Token T1 to the burn address.
9. Commit-Final: G1 sends commit-final to G2.
10. Mint-Finalise: G2 sends a transaction onto B2 to complete the minting of Token T1 on B2.
11. Final-Acknowledge


Benefits:
- non-custodial: the assets are never escrowed to a gateway's address.
- trustless (under the assumption that at least 1 gateway from each blockchain is truthful & online, and both blockchains have majority truthful nodes)
- atomic (under assumption that originator is online before time out)
- crash fault tolerant -> if G1 or G2 crash before phase 6A, Alice does not reveal the secret and can reclaim her locked asset, and the funds on B2 will not become active. If G1 crashes before phase 8 then that is still ok Alice can recover her funds on B1 and the funds on B2 will not become active. If G2 crashes on or before phase 8 that is also ok for the same reasons. If G1 crashes on phase 8 or phase 9 then another gateway will be have to get the secret from G2 and continue the phases. If G2 crashes on phase 9 or 10, then another gateway will have to get the secret from G1 and continue. If both G1 and G2 crash after phase 6A, then Alice will have to find two new gateways to complete the process.


