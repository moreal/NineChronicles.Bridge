import { ISlackMessage, SlackMessageSymbol } from ".";
import { TxId } from "../../types/txid";

type BridgeEventType = "bridge" | "refund";

type Network =
    | "odin"
    | "heimdall"
    | "idun"
    | "odin-internal"
    | "heimdall-internal"
    | "idun-internal";
type TxIdWithNetwork = [Network, TxId];
type TxLinkGetter = (tx: TxIdWithNetwork) => string;

function ncscanTxLinkGetter(tx: TxIdWithNetwork): string {
    const [network, txId] = tx;
    if (network === "odin") {
        return `https://9cscan.com/tx/${txId}`;
    }

    if (network === "odin-internal") {
        return `https://internal.9cscan.com/tx/${txId}`;
    }

    if (network === "heimdall") {
        return `https://heimdall.9cscan.com/tx/${txId}`;
    }

    if (network === "heimdall-internal") {
        return `https://heimdall-internal.9cscan.com/tx/${txId}`;
    }

    if (network === "idun") {
        return `https://idun.9cscan.com/tx/${txId}`;
    }

    if (network === "idun-internal") {
        return `https://idun-internal.9cscan.com/tx/${txId}`;
    }

    throw new TypeError(`Unexpected network type: ${network}`);
}

export class BridgeEvent implements ISlackMessage {
    [SlackMessageSymbol] = true as const;

    constructor(
        private readonly requestTx: TxIdWithNetwork,
        private readonly responseTxs: [string, TxIdWithNetwork][],
        private readonly txLinkGetter?: TxLinkGetter,
    ) {}

    render() {
        const txLinkGetter = this.txLinkGetter || ncscanTxLinkGetter;
        const responseTxAttachments = this.responseTxs.map(([name, tx]) => {
            return {
                title: `Response Tx (${name})`,
                text: txLinkGetter(tx),
            };
        });
        return {
            text: "Bridge Event Occurred.",
            attachments: [
                {
                    title: "Request Tx",
                    text: txLinkGetter(this.requestTx),
                },
                ...responseTxAttachments,
            ],
            fallback: "Bridge Event Occurred.",
        };
    }
}