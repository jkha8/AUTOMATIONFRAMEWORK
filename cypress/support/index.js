import './commands'
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

Cypress.on('uncaught:exception', (err, runnable, promise) => {
    // when the exception originated from an unhandled promise
    // rejection, the promise is provided as a third argument
    // you can turn off failing the test in this case
    if (promise) {
      return false
    }
    // we still want to ensure there are no other unexpected
    // errors, so we let them fail the test
  })

  cy.origin('https://example.cypress.io', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress
      // inside the cy.origin() method from failing the test
      return false
    })
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    // we expect a 3rd party library error with message 'list not defined'
    // and don't want to fail the test so we return false
    if (err.message.includes('list not defined')) {
      return false
    }
    // we still want to ensure there are no other unexpected
    // errors, so we let them fail the test
  })

  it('is doing something very important', (done) => {
    // this event will automatically be unbound when this
    // test ends because it's attached to 'cy'
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('something about the error')
  
      // using mocha's async done callback to finish
      // this test so we prove that an uncaught exception
      // was thrown
      done()
  
      // return false to prevent the error from
      // failing this test
      return false
    })
  
    // assume this causes an error
    cy.get('button').click()
  })


  Cypress.on('fail', (error, runnable) => {
    debugger
  
    // we now have access to the err instance
    // and the mocha runnable this failed on
  
    throw error // throw error to have test still fail
  })
  
  it('calls the "fail" callback when this test fails', () => {
    // when this cy.get() fails the callback
    // is invoked with the error
    cy.get('element-that-does-not-exist')
  })

  // app code
$('button').on('click', (e) => {
    // change the page programmatically
    window.location.href = '/some/new/link'
  })
  
  // test code
  it('redirects to another page on click', (done) => {
    // this event will automatically be unbound when this
    // test ends because it's attached to 'cy'
    cy.on('window:before:unload', (e) => {
      // no return value on the event
      expect(e.returnValue).to.be.undefined
    })
  
    cy.on('window:unload', (e) => {
      // using mocha's async done callback to finish
      // this test so we are guaranteed the application
      // was unloaded while navigating to the new page
      done()
    })
  
    // click the button causing the page redirect
    cy.get('button').click()
  })

  it('can modify the window prior to page load on all pages', () => {
    // create the stub here
    const ga = cy.stub().as('ga')
  
    // prevent google analytics from loading
    // and replace it with a stub before every
    // single page load including all new page
    // navigations
    cy.on('window:before:load', (win) => {
      Object.defineProperty(win, 'ga', {
        configurable: false,
        get: () => ga, // always return the stub
        set: () => {}, // don't allow actual google analytics to overwrite this property
      })
    })
  
    cy
      // window:before:load will be called here
      .visit('/first/page')
  
      .then((win) => {
        // and here
        win.location.href = '/second/page'
      })
  
      // and here
      .get('a')
      .click()
  })

  // app code
$('button').on('click', (e) => {
    const one = confirm('first confirm')
  
    if (one) {
      const two = confirm('second confirm')
  
      if (!two) {
        const three = confirm('third confirm')
  
        confirm('third confirm was ' + three)
      }
    }
  })
  
  // test code
  it('can control application confirms', (done) => {
    let count = 0
  
    // make sure you bind to this **before** the
    // confirm method is called in your application
    //
    // this event will automatically be unbound when this
    // test ends because it's attached to 'cy'
    cy.on('window:confirm', (str) => {
      count += 1
  
      switch (count) {
        case 1:
          expect(str).to.eq('first confirm')
        // returning nothing here automatically
        // accepts the confirmation
        case 2:
          expect(str).to.eq('second confirm')
  
          // reject the confirmation
          return false
  
        case 3:
          expect(str).to.eq('third confirm')
  
          // don't have to return true but it works
          // as well
          return true
  
        case 4:
          expect(str).to.eq('third confirm was true')
  
          // using mocha's async done callback to finish
          // this test so we are guaranteed everything
          // got to this point okay without throwing an error
          done()
      }
    })
  
    // click the button causing the confirm to fire
    cy.get('button').click()
  })
  
  it('could also use a stub instead of imperative code', () => {
    const stub = cy.stub()
  
    // not necessary but showing for clarity
    stub.onFirstCall().returns(undefined)
    stub.onSecondCall().returns(false)
    stub.onThirdCall().returns(true)
  
    cy.on('window:confirm', stub)
  
    cy.get('button')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('first confirm')
        expect(stub.getCall(1)).to.be.calledWith('second confirm')
        expect(stub.getCall(2)).to.be.calledWith('third confirm')
        expect(stub.getCall(3)).to.be.calledWith('third confirm was true')
      })
  })

  // app code
$('button').on('click', (e) => {
    alert('hi')
    alert('there')
    alert('friend')
  })
  
  it('can assert on the alert text content', () => {
    const stub = cy.stub()
  
    cy.on('window:alert', stub)
  
    cy.get('button')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('hi')
        expect(stub.getCall(1)).to.be.calledWith('there')
        expect(stub.getCall(2)).to.be.calledWith('friend')
      })
  })