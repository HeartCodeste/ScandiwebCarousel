import React, { useState } from "react";

interface NavbarProps {
  visibleSlidesCount: number;
  infinite: boolean;
  autoslide: boolean;
  onVisibleSlidesCountChange: (visibleSlidesCount: number) => void;
  onInfiniteChange: (ifinite: boolean) => void;
  onAutoslideChange: (autoslide: boolean) => void;
}

const Navbar = (props: NavbarProps) => {
  const [dropdownVisibility, setDropdownVisibility] = useState<boolean>(false);
  return (
    <div className="navbar">
      <button
        onClick={() => props.onInfiniteChange(!props.infinite)}
        className={
          props.infinite ? "navbar__btn navbar__btn--active" : "navbar__btn"
        }
      >
        infinite
      </button>
      <button
        onClick={() => props.onAutoslideChange(!props.autoslide)}
        className={
          props.autoslide ? "navbar__btn navbar__btn--active" : "navbar__btn"
        }
      >
        autoslide
      </button>
      <div className="dropdown">
        <button
          onClick={() => {
            setDropdownVisibility(!dropdownVisibility);
          }}
          className="navbar__btn"
        >
          number of slides
        </button>
        <ul
          className={
            dropdownVisibility
              ? "dropdown__list--visible dropdown__list"
              : "dropdown__list"
          }
        >
          <li>
            <button
              onClick={() => {
                props.onVisibleSlidesCountChange(1);
                setDropdownVisibility(false);
              }}
              className={
                props.visibleSlidesCount === 1
                  ? "dropdown__btn dropdown__btn--active"
                  : "dropdown__btn"
              }
            >
              1
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                props.onVisibleSlidesCountChange(2);
                setDropdownVisibility(false);
              }}
              className={
                props.visibleSlidesCount === 2
                  ? "dropdown__btn dropdown__btn--active"
                  : "dropdown__btn"
              }
            >
              2
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                props.onVisibleSlidesCountChange(3);
                setDropdownVisibility(false);
              }}
              className={
                props.visibleSlidesCount === 3
                  ? "dropdown__btn dropdown__btn--active"
                  : "dropdown__btn"
              }
            >
              3
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                props.onVisibleSlidesCountChange(4);
                setDropdownVisibility(false);
              }}
              className={
                props.visibleSlidesCount === 4
                  ? "dropdown__btn dropdown__btn--active"
                  : "dropdown__btn"
              }
            >
              4
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
