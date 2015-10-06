var rand = require('../../../server/lib/rand')

describe("lib/rand", function () {
    it("临界值检测", function* () {
        var result = rand.range(1, 1)
        result.should.equal(1)
    })

    it("范围随机", function* () {
        var result = rand.range(0, 3)
        // result.should.be.aboveOrEqual(0)
        // result.should.be.belowOrEqual(3)
        result.should.be.within(0, 3)
    })
})