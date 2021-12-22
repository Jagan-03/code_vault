import React from 'react'
import Card from '../../Components/Card/Card';
import CollectionRow from '../Collections/CollectionRow/CollectionRow';
import "./deleted.css";

const Deleted = ({gridView}) => {

    const [screenWidth, setScreenWidth] = React.useState(600);

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.screen.width);
        })
    }, [])

    return (
        <div className="deleted" id="deleted">
            <div className="container">
            {gridView ? (
          <div className="row">
            {[...Array(5)].map((ele, index) => {
              return (
                <div className="col-md-4 p-3" key={index}>
                  <Card />
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {screenWidth >= 576 ? (
              <div className="collectionRow_title row text-light">
                <div className="col-sm-6 p-2">Title</div>
                <div className="col-sm-3 p-2">Created at</div>
                <div className="col-sm-3 p-2">Last Updated</div>
              </div>
            ) : (
              <></>
            )}

            {[...Array(5)].map((ele) => (
              <CollectionRow />
            ))}
          </>
        )}
            </div>
        </div>
    )
}

export default Deleted
