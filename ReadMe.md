# REST API

#### Install

    npm install

#### Run Server

    npm run start

# Requests
## /person

### GET /person/

Returns a list of all workers

### GET /person/working/:day

Returns a list of all workers who work during a specified day

Input day instead of :day

Can be either in thre letters ex. mon or with full name ex. monday

 **_ex. /person/working/mon_**

### POST /person/

Creates a new worker

Requires two objects, schedule and person in the body

Request ex.
Request body:

```json
{
  "schedule": {
    "mon": { "start": "09:00", "end": "17:00", "working": true },
    "tue": { "start": "09:00", "end": "18:00", "working": true },
    "wed": { "start": "10:00", "end": "19:00", "working": true },
    "thu": { "start": "11:00", "end": "20:00", "working": true },
    "fri": { "start": "12:00", "end": "21:00", "working": true },
    "sat": { "start": "00:00", "end": "00:00", "working": false },
    "sun": { "start": "10:00", "end": "00:00", "working": false }
  },

  "person": {
    "name": "Adrian",
    "role": "Driver"
  }
}
```

### PUT /person/changewarehouse

Changes the working wharehouse of a worker

Body ex:

```json
{
  "personId": "633ebba5ade664b543281efe",
  "newWarehouse": "634e8ee50cdd38090649cd5d"
}
```

### DELETE /person/removeperson

Removes a worker

Body ex:

```json
{
  "personId": "633ebba5ade664b543281efe"
}
```

### PUT /person/setorder

Dets a workers current working order

Body ex:

```json
{
  "personId": "63566f933a2ada09f1e66de1",
  "orderId": "63510af84d38194930466572"
}
```

### GET /person/avalable/:role

Returns a list of all workers widhout a order as currentorder and working today

Replace :role widh the role you want to seach after

ex. /person/avalable/:picker

## /warehouse

### POST /warehouse/

Creates a new warehouse

Body ex:

```json
{ "name": "Älta" }
```

### DELETE /warehouse/

Deletes a warehouse

Body ex:

```json
{ "id": "634e5d2df1a1de0194838eaa" }
```

### PUT /warehouse/item

Adds an item to the warehouse

Body ex:

```json
{
  "warehouseId": "634e8ee50cdd38090649cd5d",
  "itemName": "Vintertäcke",
  "balance": 100,
  "place": "B3-4"
}
```

**_Make sure the item exists before you try and add it to a warehouse_**

### GET /warehouse/item

Returns a list of all items that match a name

Find item in any warehouse

Body ex:

_Find item in any warehouse:_

```json
{ "itemName": "Vintertäcke" }
```

_Find item in specific warehouse by name_

```json
{ "itemName": "Vintertäcke", "warehouseName": "Älta" }
```

_Find item in specific warehouse by warehouse id_

```json
{ "itemName": "Vintertäcke", "warehouseId": "634e8ee50cdd38090649cd5d" }
```

## /item

### POST /item/

Creates an item

Body ex:

```json
{ "name": "Pen", "price": 200 }
```

**_All item names have to be unique_**

# /order

### POST /order/

Creates a new order

Body ex:

```json
{
  "customer": "Markus",
  "orderItems": [
    {
      "itemName": "Vintertäcke",
      "ammount": 200
    }
  ]
}
```

Add more objects to orderItems array to add more items to the order.
**_All items must already exist in the system._**

### GET /order/

Returns a list of all orders that have not been picked

### PUT /order/picked

Mark an order as picked

Body ex:

```json
{
  "orderId": "635a6e68ec840c457a97fca5",
  "pickerId": "63566f933a2ada09f1e66de1"
}
```

### PUT /order/sent

Marks an order as sent

Body ex:

```json
{
  "orderId": "63510af84d38194930466572",
  "senderId": "6357d89e1a7374ae8616909b"
}
```

### GET /order/notsent

Returns oldes order that hasn't been sent

### GET /order/totalvalue/:month

Returns the total value of all orders sent during specified month.
Replace :month with the desired month

**Use the number of the month! January = 0, February = 1, ... , December = 11**

### GET /order/expensive/:month

Returns the most expesnsive order sent that month. Replace :month with the desired month.

**Use the number of the month! January = 0, February = 1, ... , December = 11**
