import React from "react";
import Image from "next/image";

class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("Selected file Review ", nextProps);
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };
      if (nextProps.file !== undefined) {
        console.log("Selected file Before View ", nextProps.file);
        reader.readAsDataURL(nextProps.file);
      }
    });
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;

    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    return (
      <div className="thumb-image-area">
        <Image
          src={thumb}
          alt={file.name}
          className="img-thumbnail mt-2"
          height={200}
          width={200}
        />
      </div>
    );
  }
}

export default Thumb;
