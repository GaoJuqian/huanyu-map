import {createEffect, createMemo, createSignal} from "solid-js";

interface IProp {

}

function BaseMap(props: IProp) {
    const [name, setName] = createSignal(1),
        doubleName = createMemo(() => name() * 2);
    createEffect(() => {
        console.log(name(), doubleName());
    })

    return (
        <>
            <button onClick={() => setName(v => v + 1)}>点击</button>
            <div>Hello {name()}, {doubleName()}</div>
        </>
    );
}

export default BaseMap;
