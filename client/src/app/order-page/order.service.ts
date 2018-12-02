import {OrderPosition, Position} from "../shared/interfaces";
import {Injectable} from "@angular/core";

@Injectable()
export class OrderService {

  public list: OrderPosition[] = []
  public price = 0

  add(position: Position){

    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    })

    const candidate = this.list.find(p => p._id === orderPosition._id)

    if(candidate){
      //Change quantity
      candidate.quantity += orderPosition.quantity
    }else{
      //Add new position in order
      this.list.push(orderPosition)
    }

    this.computePrice()
  }

  remove(orderPosition: OrderPosition){
    const idx = this.list.findIndex(p => p._id === orderPosition._id)
    this.list.splice(idx, 1)
    this.computePrice()
  }

  clear(){
    this.list = []
    this.price = 0
  }

  private computePrice(){
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }

}
