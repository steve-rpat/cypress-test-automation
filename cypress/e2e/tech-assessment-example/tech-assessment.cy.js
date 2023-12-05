/// <reference types="cypress" />

// This Test Spec is an example of potential solutions for the Brilliant QA Tech Assessment
// Bonus points if the script completes all tasks in less than 10 seconds

describe('QA Tech Assessment', () => {

    it('Main Dashboard', () => {
        // Visit the target website and set the 'theme' to 'Light' (not Material Light)
        cy.visit('/dashboard/', {failOnStatusCode: false})
        cy.get('[alt="Light Theme"]').click()
        cy.get('.theme-select > .select-button').should('have.text', 'Light')
        cy.get('.theme-select > .select-button').should('not.have.text', 'Material Light')

        // On the main dashboard, check that Ethereum is listed in the Crypto dropdown (initially set to Bitcoin)
        cy.contains('Bitcoin').should('be.visible')
        cy.contains('Bitcoin').click()
        cy.contains('Ethereum').should('be.visible')

        // Navigate to the IoT Dashboard page and turn off the coffee maker
        cy.contains('IoT Dashboard').click()
        cy.contains('Coffee Maker').click()
            .parent()
            .children()
            .should('contain', 'OFF')

        // Set the thermostat temperature gage to 18 degrees Celcius
        cy.get('.svg-container > svg').click(20, 10)

        // Output via log the current temperature listed for New York (towards the bottom of the page)
        cy.contains('New York').parent()
            .children()
            .find('.today-temperature')
            .then(($temp_val) => {
                const temp_text = $temp_val.text()
                cy.log('New York temperature', temp_text)
            })
        
        // Output all of the energy consumption numbers for the year 2015
        var month_array = [""]
        var ctr = 0
        cy.contains('2015').click()
        cy.log('Montly energy consumption, by month:')
        cy.contains('Feb')
            .parent()
            .parent()
            .children()
            .each(($month_val) => {
                month_array[ctr] = $month_val.text()
                cy.log(month_array[ctr])
                ctr ++
            })

        // Count CSS objects
        cy.contains('UI Features').click()
        cy.contains('Grid').click()
        cy.get('.col-md-1').should('have.length', 12)
        cy.get('.col-md-4').should('have.length', 11)

        // Count Ionicons
        cy.contains('Icons').click()
        cy.get('.ion-ionic').parent()
            .children()
            .should('have.length', 70)

    // This is the additional test case for the follow up Zoom Call
        // Interact with the chat feature, send a message and output response
        cy.contains('Extra Components').click()
        cy.contains('Chat').click()
        cy.get('.with-button').type('Hello World!{enter}')
        cy.get('.ng-tns-c135-68 > .text').should('be.visible')
            .then(($message) => {
                const message_text = $message.text()
                cy.log('Message response', message_text)
            })
    })

})