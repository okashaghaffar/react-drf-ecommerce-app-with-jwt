import React, { useEffect, useState } from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
export default function SellerScreen() {
    const navigate= useNavigate();
  useEffect(() => {
    if (Cookies.get("access_token") === undefined || localStorage.getItem("seller")==="false") {
      // window.location.href = "/login";
      navigate("/login");
    }
  }, []);
  console.log(Cookies.get("id"));
  const id = Cookies.get("id");
  const [productname, setProductName] = useState("");
  const [image, setImage] = useState(null);
  const [productbrand, setProductBrand] = useState("");
  const [productcategory, setProductCategory] = useState("");
  const [productinfo, setProductInfo] = useState("");
  // const [rating, setRating] = useState(null);
  const rating = 4.5;
  // const [numReviews, setNumReviews] = useState(null);
  const numReviews = 5;
  const [price, setPrice] = useState(null);
  const [stockcount, setStockCount] = useState(null);
  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user", id);
    formData.append("productname", productname);
    formData.append("image", image);
    formData.append("productbrand", productbrand);
    formData.append("productcategory", productcategory);
    formData.append("productinfo", productinfo);
    formData.append("rating", rating);
    formData.append("numReviews", numReviews);
    formData.append("price", price);
    formData.append("stockcount", stockcount);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/addproduct", {
        method: "POST",
       
        body: formData,
      });
      const data = await response.json();
      console.log("Product created successfully:", data);
      setImage("");
      // setNumReviews("");
      setPrice("");
      setProductBrand("");
      setProductInfo("");
      setProductCategory("");
      // setRating("");
      setStockCount("");

      // Add your success handling logic here
    } catch (error) {
      console.error("Error creating product:", error);
      // Add your error handling logic here
    }
  };

  return (
    <>
      <Header></Header>
      <div className="container mt-2">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={productname}
              onChange={(e) => handleChange(e, setProductName)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Brand</label>
            <input
              type="text"
              className="form-control"
              value={productbrand}
              onChange={(e) => handleChange(e, setProductBrand)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Category</label>
            <input
              type="text"
              className="form-control"
              value={productcategory}
              onChange={(e) => handleChange(e, setProductCategory)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Info</label>
            <textarea
              className="form-control"
              value={productinfo}
              onChange={(e) => handleChange(e, setProductInfo)}
            ></textarea>
          </div>
          {/* <div className="mb-3">
            <label className="form-label">Rating</label>
            <input type="number" className="form-control" value={rating} onChange={(e) => handleChange(e, setRating)} />
        </div> */}
          {/* <div className="mb-3">
            <label className="form-label">Number of Reviews</label>
            <input type="number" className="form-control" value={numReviews} onChange={(e) => handleChange(e, setNumReviews)} />
        </div> */}
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => handleChange(e, setPrice)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Stock Count</label>
            <input
              type="number"
              className="form-control"
              value={stockcount}
              onChange={(e) => handleChange(e, setStockCount)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Product
          </button>
        </form>
      </div>
    </>
  );
}
