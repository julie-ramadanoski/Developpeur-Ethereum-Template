# Ownable.sol

View Source: [@openzeppelin\contracts\access\Ownable.sol](..\..\..\@openzeppelin\contracts\access\Ownable.sol)

**↗ Extends: [Context](Context.md)**

**↘ Derived Contracts: [Voting](Voting.md)**

**Ownable**

Contract module which provides a basic access control mechanism, where
 there is an account (an owner) that can be granted exclusive access to
 specific functions.
 By default, the owner account will be the one that deploys the contract. This
 can later be changed with {transferOwnership}.
 This module is used through inheritance. It will make available the modifier
 `onlyOwner`, which can be applied to your functions to restrict their use to
 the owner.

## Contract Members
**Constants & Variables**

```js
address private _owner;

```

**Events**

```js
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

## Modifiers

- [onlyOwner](#onlyowner)

### onlyOwner

Throws if called by any account other than the owner.

```js
modifier onlyOwner() internal
```

## Functions

- [constructor()](#constructor)
- [owner()](#owner)
- [_checkOwner()](#_checkowner)
- [renounceOwnership()](#renounceownership)
- [transferOwnership(address newOwner)](#transferownership)
- [_transferOwnership(address newOwner)](#_transferownership)

---    

> ### constructor

Initializes the contract setting the deployer as the initial owner.

```solidity
function () internal nonpayable
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
constructor() {
        _transferOwnership(_msgSender());
    }
```
</details>

---    

> ### owner

Returns the address of the current owner.

```solidity
function owner() public view
returns(address)
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function owner() public view virtual returns (address) {
        return _owner;
    }
```
</details>

---    

> ### _checkOwner

Throws if the sender is not the owner.

```solidity
function _checkOwner() internal view
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }
```
</details>

---    

> ### renounceOwnership

Leaves the contract without owner. It will not be possible to call
 `onlyOwner` functions anymore. Can only be called by the current owner.
 NOTE: Renouncing ownership will leave the contract without an owner,
 thereby removing any functionality that is only available to the owner.

```solidity
function renounceOwnership() public nonpayable onlyOwner 
```

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }
```
</details>

---    

> ### transferOwnership

Transfers ownership of the contract to a new account (`newOwner`).
 Can only be called by the current owner.

```solidity
function transferOwnership(address newOwner) public nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| newOwner | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }
```
</details>

---    

> ### _transferOwnership

Transfers ownership of the contract to a new account (`newOwner`).
 Internal function without access restriction.

```solidity
function _transferOwnership(address newOwner) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |

| ------------- |------------- | -----|

| newOwner | address |  | 

<details>
	<summary><strong>Source Code</strong></summary>

```javascript
function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
```
</details>

## Contracts

* [Context](Context.md)
* [Ownable](Ownable.md)
* [SimpleStorage](SimpleStorage.md)
* [Voting](Voting.md)
