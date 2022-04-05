# Definition of transaction

[See the example file](../exp/index.js)
Run example:

```bash
node exp/index.js
```

We have the folowing transaction chain

```bash
0x0xf8 6c 01 85  82 5208 94  88  80 25 a0 67da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6c a0 0b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842
```

## HEADERS

`0x` --> Start of tx
`f8` --> 0xf8 - 0x`LENGTH_OF_PAYLOAD`  
`6c` --> 108 bytes length of the payload
`01` --> nonce

---

## PAYLOAD

The payload has the following structure

| LENGTH_GAS_PRICE | GAS_PRICE | LENGTH_GAS_LIMIT | GAS_LIMIT | LENGTH_ADDRESS_FROM | ADDRESS_FROM | LENGTH_ADDRESS_TO | ADDRESS_TO | DATA_OF_TX | V_VALUE | FLAG | R_VALUE | S_VALUE |
| ---------------- | --------- | ---------------- | --------- | ------------------- | ------------ | ----------------- | ---------- | ---------- | ------- | ---- | ------- | ------- |

### GAS_PRICE

For calculating the lenth we have to calculate: 0x`LENGTH_GAS_PRICE` - 0x80
Here is `0x85 - 0x80 = 5 bytes`
Then, we have the gas price is the next 5 bytes:
`0c4b201000`

---

### GAS_LIMIT

In the same way you find the length of `GAST_LIMIT` in next 2 bytes after GAS_PRICE, and we have to calculate: 0x`LENGTH_GAS_LIMIT` - 0x80
In this case is:
`0x82- 0x80 = 2 bytes`
So we have the gas limit is :
`5208`

---

### ADDRESS_FROM

The next 2 bytes are the length of ADDRESS_FROM, and we have to calculate:
0x`LENGTH_ADDRESS_FROM` - 0x80
So, it would be:
`0x94 - 0x80 = 20bytes`
Then, the ADDRESS_FROM is:
`9cbfd6ebdb9cfcccd6b043f43e524583486d455e`

---

### ADDRESS_TO

The next 2 bytes are the length of ADDRESS_TO, and we have to calculate:
0x`LENGTH_ADDRESS_TO` - 0x80
So, it would be:
`0x88 - 0x80 = 8 bytes`
Then, the ADDRESS_FROM is:
`0490283b23ec8f76`

---

### DATA

The data field contains all information in 2 bytes, in this case is:
`80`

---

### V FIELD

This field is encoded in 2 bytes `V_VALUE` is: `25`

---

### FLAG

This flag is `a0`

---

### R FIEL

`67da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6c`

---

### S FIEL

`0b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842`
