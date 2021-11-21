import React, { Component } from "react";
import Image from "next/image";

class CstImageView extends Component {
  

  render() {
    let {
      altTag = "Image Not found",
      width = 500,
      height = 500,
    } = this.props;

    return (
      <React.Fragment>
        <Image
          src={this.props.thumb ? this.props.thumb : this.props.defaultSrc}
          alt={altTag}
          width={width}
          height={height}
        />
      </React.Fragment>
    );
  }
}

export default CstImageView;
