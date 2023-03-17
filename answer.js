module.export = function (points, x0, y0, zoom) {
    const field = {
        minX: Math.round(-100 / zoom + x0),
        minY: Math.round(-100 / zoom + y0),
        maxX: Math.round(100 / zoom + x0),
        maxY: Math.round(100 / zoom + y0),
    }
    const cellSize = {
        x: (Math.abs(field.minX) + Math.abs(field.maxX)) / 10,
        y: (Math.abs(field.minY) + Math.abs(field.maxY)) / 10,
    }
    result = []
    points.forEach(point => {
        const correctX = point.x >= field.minX && point.x <= field.maxX
        const correctY = point.y >= field.minY && point.y <= field.maxY
        if (correctX && correctY) {
            const lengthY = Math.abs(field.minY) + Math.abs(field.maxY)
            const ratioX = field.minX < 0 ? -field.minX : 0
            const ratioY = field.minY < 0 ? -field.minY : 0
            const x = point.x > 0 ? point.x + ratioX : Math.abs(-point.x - ratioX)
            const y = point.y > 0 ? lengthY - (point.y + ratioY) : lengthY - (point.y + ratioX)
            const i = Math.floor(x / cellSize.x)
            const j = Math.floor(y / cellSize.y)

            const check = result.find(el => el.i === i && el.j === j)
            if (check) {
                check.count++
            } else {
                console.log(point.y)
                result.push({ i: point.x === field.maxX ? 9 : i, j: point.y === field.minY ? 9 : j, count: 1 })
            }
        }
    })
    result.sort((a, b) => a.i - b.i)
    result.sort((a, b) => a.j - b.j)
    return result
}
