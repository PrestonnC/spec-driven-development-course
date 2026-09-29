import type { Ailment } from '../db/queries'

type AilmentsListProps = {
  ailments: Ailment[]
}

export const AilmentsList = ({ ailments }: AilmentsListProps) => (
  <section>
    <h1>Ailments</h1>
    <figure>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {ailments.map((ailment) => (
            <tr>
              <th scope="row">{ailment.name}</th>
              <td>{ailment.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  </section>
)
