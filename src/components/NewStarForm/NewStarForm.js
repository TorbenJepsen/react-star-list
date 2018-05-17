import React from 'react';


const NewStarForm = (props) => (
            <div>
                <form onSubmit={props.handleSubmitForChild}>
                    <input value={props.newStar.name} onChange={props.handleChangeForChild('name')} placeholder="Star Name" />
                    <input value={props.newStar.diameter} onChange={props.handleChangeForChild('diameter')} placeholder="Diameter" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
);

export default NewStarForm;
