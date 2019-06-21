import React from 'react';
import slider1 from '../images/slider4.jpg';
import slider3 from '../images/slider5.jpg';
import slider2 from '../images/slider3.png';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { React_Bootstrap_Carousel } from "react-bootstrap-carousel";
const styles = { height: 400, width: "100%" };
class SliderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: true
    };
  }
  onSelect = (active, direction) => {
    console.log(`active=${active} && direction=${direction}`);
  };
  slideNext = () => {
    this.slider.slideNext();
  };
  slidePrev = () => {
    this.slider.slidePrev();
  };
  goToSlide = () => {
    this.slider.goToSlide(4);
  };
  autoplay = () => {
    this.setState({ autoplay: !this.state.autoplay });
  };
  _changeIcon = () => {
    let { leftIcon, rightIcon } = this.state;
    if (leftIcon && rightIcon) {
      this.setState({
        leftIcon: undefined,
        rightIcon: undefined
      });
    } else {
      this.setState({
        leftIcon: <span className="fa fa-glass" />,
        rightIcon: <span className="fa fa-music" />
      });
    }
  };
  render() {
    return (
      
        <React_Bootstrap_Carousel
          animation={true}
          autoplay={this.state.autoplay}
          slideshowSpeed={7000}
          leftIcon={this.state.leftIcon}
          rightIcon={this.state.rightIcon}
         // onSelect={this.onSelect}
          ref={r => (this.slider = r)}
          version={4}
        >
          <div style={{ height: 320 }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={slider1} alt=""
            />
            <div className="carousel-caption">Image</div>
          </div>

          <div style={{ height: 320 }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={slider2} alt=""
            />
            <div className="carousel-caption">Image</div>
          </div>
          <div style={{ height: 320 }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={slider3} alt=""
            />
            <div className="carousel-caption">Image</div>
          </div>
        </React_Bootstrap_Carousel>
    )
  }
}
export default SliderComponent;

