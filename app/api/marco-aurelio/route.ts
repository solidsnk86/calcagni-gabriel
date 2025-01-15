import data from './marco-frases.json';

export async function GET() {
  try {
    if (!data) return Response.json({ message: 'JSON file not found' });
    return Response.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return Response.json(
      { success: false, error: 'Server Error: ' + err },
      { status: 500 }
    );
  }
}
