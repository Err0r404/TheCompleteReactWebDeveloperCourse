// live-server public
// babel src/playground/es6_counter_example.js --out-file=public/scripts/app.js --presets=env,react --watch

class Counter extends React.Component {
    constructor(props){
        super(props);

        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);

        this.state = {
            count : props.count
        }
    }

    componentDidMount() {
        // Fetching data from localStorage
        try {
            const count = localStorage.getItem('count');

            if (count && !isNaN(count)) {
                this.setState(() => ({count: parseInt(count, 10)}));
            }
        }
        catch (e) {
            // Do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Saving data to localStorage if necessary
        if (prevState.count !== this.state.count) {
            localStorage.setItem('count', this.state.count);
        }
    }

    handleAddOne(){
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            };
        });
    }

    handleMinusOne(){
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            };
        });
    }

    handleReset(){
        this.setState(() => {
            return {
                count: 0
            };
        });
    }

    render(){
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        )
    }
}

Counter.defaultProps = {
    count: 0
};

ReactDOM.render(<Counter/>, document.getElementById('app'));