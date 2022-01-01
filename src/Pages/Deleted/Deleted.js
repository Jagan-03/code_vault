import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTrash } from '../../actions/trash';
import CollectionRow from '../Collections/CollectionRow/CollectionRow';
import "./deleted.css";

const Deleted = ({gridView}) => {

    const [screenWidth, setScreenWidth] = React.useState(window.screen.width);
    
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.getUser);

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setScreenWidth(window.screen.width);
        })
        dispatch(getTrash(user?.username));
      }, [dispatch, user]);

    const { loading, trash } = useSelector(state => state.getTrash);

    return (
        <div className="deleted text-center" id="deleted">
            {
              trash.length !== 0 ? 
            <div className="container">
            
            {screenWidth >= 576 ? (
              <div className="collectionRow_title row text-light text-start">
                <div className="col-sm-6 p-2">Title</div>
                <div className="col-sm-3 p-2 text-center">Restore</div>
                <div className="col-sm-3 p-2 text-center">Delete</div>
              </div>
            ) : (
              <></>
            )}

            {!loading && trash.map((record) => (
              <CollectionRow record={record} trash/>
            ))}
            </div> : <h1 className="display-1">No items in the trash</h1>
            }
        </div>
    )
}

export default Deleted
