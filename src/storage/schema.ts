import lf from 'lovefield';
import stub from './db.json';

export async function connect() {
    const schemaBuilder: lf.schema.Builder = lf.schema.create('calendar', 1);
    schemaBuilder
        .createTable('Event')
        .addColumn('id', lf.Type.INTEGER)
        .addColumn('title', lf.Type.STRING)
        .addColumn('start', lf.Type.DATE_TIME)
        .addColumn('end', lf.Type.DATE_TIME)
        .addPrimaryKey(['id'], false);

    const connectOptions: lf.schema.ConnectOptions = {
        storeType: lf.schema.DataStoreType.MEMORY,
    };
    const db = await schemaBuilder.connect(connectOptions);
    const calendarDb = db;
    const eventTable = db.getSchema().table('Event');
    await calendarDb.import(stub);
    return await calendarDb.select().from(eventTable).exec();
}
