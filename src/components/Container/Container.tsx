import "./Container.css"


const Container = (props : any) => {
    return (
        <div className='container'>
            {props.children}
        </div>
    );
};

export default Container;