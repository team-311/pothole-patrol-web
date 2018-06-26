//line graph with zoom
<div>
  <VictoryChart width={600} height={470} scale={{ x: "time" }}
    containerComponent={
      <VictoryZoomContainer
        zoomDimension="x"
        zoomDomain={this.state.zoomDomain}
        onZoomDomainChange={this.handleZoom.bind(this)}
      />
    }
  >
    <VictoryLine
      style={{
        data: { stroke: "tomato" }
      }}
      data={[
        { a: new Date(1982, 1, 1), b: 125 },
        { a: new Date(1987, 1, 1), b: 257 },
        { a: new Date(1993, 1, 1), b: 345 },
        { a: new Date(1997, 1, 1), b: 515 },
        { a: new Date(2001, 1, 1), b: 132 },
        { a: new Date(2005, 1, 1), b: 305 },
        { a: new Date(2011, 1, 1), b: 270 },
        { a: new Date(2015, 1, 1), b: 470 }
      ]}
      x="a"
      y="b"
    />

  </VictoryChart>
  <VictoryChart
    padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
    width={600} height={100} scale={{ x: "time" }}
    containerComponent={
      <VictoryBrushContainer
        brushDimension="x"
        brushDomain={this.state.zoomDomain}
        onBrushDomainChange={this.handleZoom.bind(this)}
      />
    }
  >
    <VictoryAxis
      tickFormat={(x) => new Date(x).getFullYear()}
    />
    <VictoryLine
      style={{
        data: { stroke: "tomato" }
      }}
      data={[
        { key: new Date(1982, 1, 1), b: 125 },
        { key: new Date(1987, 1, 1), b: 257 },
        { key: new Date(1993, 1, 1), b: 345 },
        { key: new Date(1997, 1, 1), b: 515 },
        { key: new Date(2001, 1, 1), b: 132 },
        { key: new Date(2005, 1, 1), b: 305 },
        { key: new Date(2011, 1, 1), b: 270 },
        { key: new Date(2015, 1, 1), b: 470 }
      ]}
      x="key"
      y="b"
    />
  </VictoryChart>
</div>


  //pie with center label
  <svg viewBox="0 0 400 400">
    <VictoryPie
      standalone={false}
      width={400} height={400}
      data={[
        { x: 1, y: 120 }, { x: 2, y: 150 }, { x: 3, y: 75 }
      ]}
      innerRadius={68} labelRadius={100}
      style={{ labels: { fontSize: 20, fill: "white" } }}
    />
    <VictoryLabel
      textAnchor="middle"
      style={{ fontSize: 20 }}
      x={200} y={200}
      text="Pie!"
    />
  </svg>


  //stacked with fill
  <div>
    <VictoryChart scale={{ x: "time" }} width={400} height={400}>
      <VictoryStack colorScale="warm">
        <VictoryGroup
          data={[
            { x: new Date(1986, 1, 1), y: 2 },
            { x: new Date(1996, 1, 1), y: 3 },
            { x: new Date(2006, 1, 1), y: 5 },
            { x: new Date(2016, 1, 1), y: 4 }
          ]}
        >
          <VictoryArea />
          <VictoryPortal>
            <VictoryScatter
              style={{ data: { fill: "black" } }}
            />
          </VictoryPortal>
        </VictoryGroup>
        <VictoryGroup
          data={[
            { x: new Date(1986, 1, 1), y: 4 },
            { x: new Date(1996, 1, 1), y: 3 },
            { x: new Date(2006, 1, 1), y: 2 },
            { x: new Date(2016, 1, 1), y: 5 }
          ]}
        >
          <VictoryArea />
          <VictoryPortal>
            <VictoryScatter
              style={{ data: { fill: "black" } }}
            />
          </VictoryPortal>
        </VictoryGroup>
        <VictoryGroup
          data={[
            { x: new Date(1986, 1, 1), y: 3 },
            { x: new Date(1996, 1, 1), y: 1 },
            { x: new Date(2006, 1, 1), y: 4 },
            { x: new Date(2016, 1, 1), y: 2 }
          ]}
        >
          <VictoryArea />
          <VictoryPortal>
            <VictoryScatter
              style={{ data: { fill: "black" } }}
            />
          </VictoryPortal>
        </VictoryGroup>
      </VictoryStack>
    </VictoryChart>
  </div>
