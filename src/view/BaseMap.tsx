import {createEffect, createMemo, createSignal, For, Index, onMount} from "solid-js";
import MapUtil from "../util/Map/Map";
import "ol/ol.css";
import userPin from "../assets/map-pin-user-line.svg";


interface IProp {

}

let mapRef: any = null;

function BaseMap(props: IProp) {

    const [list, setList] = createSignal<Array<Record<string, any>>>([
        {id: 1, name: "a"},
        {id: 2, name: "b"},
        {id: 3, name: "c"},
    ])


    onMount(() => {
        const map = new MapUtil({el: mapRef});
        map.addMovePoint({icon: userPin})

    })

    return (
        <>
            {/*<button onClick={() => setList(v => ([{id: 13, name: "23123"}, ...v]))}>点击</button>*/}
            {/*<Index each={list()}>*/}
            {/*    {*/}
            {/*        (item, i) => (*/}
            {/*            <input value={item().name} onChange={(e) => {*/}
            {/*                setList(list().map((map_itm, map_idx) => map_idx === i ? {*/}
            {/*                    ...item(),*/}
            {/*                    name: (e.target as HTMLInputElement).value*/}
            {/*                } : map_itm))*/}
            {/*            }}/>*/}
            {/*        )*/}
            {/*    }*/}
            {/*</Index>*/}

            <div ref={mapRef} style={{"width": "100vw", "height": "100vh"}}></div>

        </>
    );
}

export default BaseMap;
