import React, { Component } from "react";
import { Media } from "reactstrap";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import DishDetail from './DishdetailComponent';
import { format } from "date-fns";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDish: null,
    };
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  renderDish(dish) {
    if (dish != null) return <DishDetail dish={dish} />;
    else return <div></div>;
  }
  renderComments(dish) {
    if (dish != null)
      return (
        <div>
          <div>
            <div>
              <h4>Comments</h4>
              {dish.comments.map((comment) => {
                return (
                  <div>
                    <div key={comment.id}>
                      <p>{comment.comment}</p>

                      <p>
                        --{comment.author},
                        {format(Date.parse(comment.date), "MMMM do, yyyy ")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    else return <div></div>;
  }

  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle className="font-weight-bold">{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.state.selectedDish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComments(this.state.selectedDish)}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
