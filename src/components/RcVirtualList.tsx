import { useEffect, useRef, useState } from "react";
import './RcVirtualList.css';

interface RcVirtualListProps<T> {
  list: T[];
  threshold?: number;
  itemHeight?: number;
  render: (item: T) => React.ReactNode;
}

function RcVirtualList<T>({ 
  list,
  threshold = 5,
  itemHeight = 20,
  render,
}: RcVirtualListProps<T>) {
  const [listToRender, setListToRender] = useState({
    startIndex: 0,
    endIndex: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const onWheel = () => {
    if(!containerRef.current) return;

    const { scrollTop, clientHeight } = containerRef.current.parentElement as HTMLDivElement;
    const startIndex = Math.max(Math.ceil(scrollTop / itemHeight) - threshold, 0);
    const endIndex = Math.min(Math.ceil((scrollTop + clientHeight) / itemHeight) + threshold, list.length);

    setListToRender({
      startIndex,
      endIndex
    })
  }

  useEffect(() => {
    if(!containerRef.current) return;

    // Set height for the parent
    containerRef.current.setAttribute('style', `height: ${list.length * itemHeight}px`)

    // Set initial list to render
    const itemPerView = Math.ceil((containerRef.current.parentElement?.clientHeight || 0) / itemHeight);

    setListToRender({
      startIndex: 0,
      endIndex: itemPerView + threshold
    })

  }, [itemHeight, list.length, threshold])

  return (
    <div className="rc-container" onWheel={onWheel} onScroll={onWheel} ref={containerRef}>
      {
        list.slice(listToRender.startIndex, listToRender.endIndex).map((item, index) => (
          <div
            key={index}
            className="rc-item"
            style={{
              position: 'absolute',
              left: 0,
              top: `${(listToRender.startIndex + index) * itemHeight}px`,
              height: `${itemHeight}px`,
            }}
          >
            {render(item)}
          </div>
        ))
      }
    </div>
  )
}

export default RcVirtualList;