import { describe, it, expect } from "vitest";
import { Address, RawPrivateKey } from "@planetarium/account";
import { encode } from "@planetarium/bencodex";
import { encodeMintAssetsAction } from "./mint";

describe(encodeMintAssetsAction.name, async () => {
    const sender = Address.deriveFrom(await RawPrivateKey.generate().getPublicKey())
    const ncgMinter = Address.fromHex("47d082a115c63e7b58b1532d20e631538eafadde", true);
    describe("snapshot", () => {
        it("mint_asset with memo", () => {
            expect(encode(encodeMintAssetsAction(
                sender,
                {
                    currency: {
                        ticker: "NCG",
                        decimalPlaces: 0,
                        minters: new Set([
                            ncgMinter.toBytes()
                        ]),
                        maximumSupply: null,
                        totalSupplyTrackable: false,
                    },
                    rawValue: 100n,
                },
                "MEMO"
            ))).toMatchSnapshot();
        });
    });
});