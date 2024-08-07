const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowPrincipal = addKeyword(['timer', 'Timer'])
    .addAnswer('⏰ Se ha iniciado tu descanso de 30 minutos ⏰')
    .addAction(async (ctx, ctxFn) => {
        setTimeout(() => {
            return ctxFn.endFlow('⚠ Tu descanso ha terminado ⚠')
        }, 1800000) 
    })

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
