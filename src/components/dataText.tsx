import React from "react";
import { CarouselItem } from "./Carousel";

export const dataText: CarouselItem[] = [
  {
    id: 1,
    content: (
      <blockquote className="blockquote">
        <p className="blockquote__text">
          In some ways, programming is like painting. You start with a blank
          canvas and certain basic raw materials. You use a combination of
          science, art, and craft to determine what to do with them.
        </p>
        <p className="blockquote__author">Andrew Hunt</p>
      </blockquote>
    ),
  },
  {
    id: 2,
    content: (
      <div className="table-container">
        <table className="table-content">
          <thead>
            <tr className="table-content__heading">
              <th>Name</th>
              <th>Age</th>
              <th>Job</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pervin</td>
              <td>26</td>
              <td>Teacher</td>
              <td>Turkey</td>
            </tr>
            <tr>
              <td>Akane</td>
              <td>32</td>
              <td>Photographer</td>
              <td>Japan</td>
            </tr>
            <tr>
              <td>Diego</td>
              <td>29</td>
              <td>Firefighter</td>
              <td>Spain</td>
            </tr>
            <tr>
              <td>Charles</td>
              <td>57</td>
              <td>Journalist</td>
              <td>France</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="custom-list">
        <div className="custom-list__container">
          <h3>Advantages of social media</h3>
          <ul className="custom-list__content">
            <li>Building relationships.</li>
            <li>Connecting at any time and place.</li>
            <li>Providing entertainment.</li>
            <li>Spreading information fast.</li>
          </ul>
        </div>
      </div>
    ),
  },
];
