import Item from './Item'

const AGED_BRIE = "Aged Brie"
const DEXTERITY = "+5 Dexterity Vest"
const ELIXIR = "Elixir of the Mongoose"
const SULFURAS = "Sulfuras, Hand of Ragnaros"
const BACKSTAGE = "Backstage passes to a TAFKAL80ETC concert"
const CONJURED = "Conjured Mana Cake"

var GildedRose = function () {
  var items = []
  items.push(new Item(DEXTERITY, 10, 20))
  items.push(new Item(AGED_BRIE, 2, 0))
  items.push(new Item(ELIXIR, 5, 7))
  items.push(new Item(SULFURAS, 0, 80))
  items.push(new Item(BACKSTAGE, 15, 20))
  items.push(new Item(CONJURED, 3, 6))
  updateQuality(items)
}

export function updateQuality(items) {
  for (var i = 0; i < items.length; i++) {
    if (AGED_BRIE != items[i].name && BACKSTAGE != items[i].name) {
      //TODO: Improve this code.
      if (items[i].quality > 0) {
        if (SULFURAS != items[i].name) {
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (AGED_BRIE == items[i].name) {
            if (items[i].sellIn < 6) {
              items[i].quality = items[i].quality + 1
            }
        }
        //Increases the Quality of the stinky cheese if its 11 days to due date.
        if (AGED_BRIE == items[i].name) {
            if (items[i].sellIn < 11) {
              items[i].quality = items[i].quality + 1
            }
        }
        if (BACKSTAGE == items[i].name) {
          if (items[i].sellIn < 11) {
            // See revision number 2394 on SVN.
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          //Increases the Quality of Backstage Passes if the Quality is 6 or less.
          if (items[i].sellIn < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }
    if (SULFURAS != items[i].name) {
      items[i].sellIn = items[i].sellIn - 1
    }
    if (items[i].sellIn < 0) {
      if (AGED_BRIE != items[i].name) {
        if (BACKSTAGE != items[i].name) {
          if (items[i].quality > 0) {
            if (SULFURAS != items[i].name) {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          //TODO: Fix this.
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
        if (AGED_BRIE == items[i].name && items[i].sellIn <= 0)
            items[i].quality = 0
      } // of for.
    }
    if (SULFURAS != items[i].name)
      if (items[i].quality > 50) items[i].quality = 50
  }
  return items
}

export default GildedRose
