import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Contato from '../../models/Contato'

import * as enums from '../../utils/enums/Contato'

type ContatoState = {
  itens: Contato[]
}

const initialState: ContatoState = {
  itens: [
    {
      id: 1,
      nomeCompleto: 'Willian Bonner',
      telefone: '(48) 99920-8923',
      email: 'willianbonner123@gmail.com',
      classificacao: enums.Classificacao.AMIGO
    },
    {
      id: 2,
      nomeCompleto: 'Steve Jobs',
      telefone: '(48) 99663-8992',
      email: 'apple@gmail.com',
      classificacao: enums.Classificacao.FAMILIAR
    },
    {
      id: 3,
      nomeCompleto: 'Gian Souza',
      telefone: '(11) 99423-2751',
      email: 'giansouza@icloud.com',
      classificacao: enums.Classificacao.OUTROS
    }
  ]
}

const contatosSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...state.itens.filter((contato) => contato.id !== action.payload)
      ]
    },
    editar: (state, action: PayloadAction<Contato>) => {
      const indexDoContato = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexDoContato >= 0) {
        state.itens[indexDoContato] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Contato, 'id'>>) => {
      const contatoJaExiste = state.itens.find(
        (contato) =>
          contato.nomeCompleto.toLowerCase() ===
          action.payload.nomeCompleto.toLowerCase()
      )

      if (contatoJaExiste) {
        alert('Já existe um contato com esse nome')
      } else {
        const ultimoContato = state.itens[state.itens.length - 1]

        const contatoNovo = {
          ...action.payload,
          id: ultimoContato ? ultimoContato.id + 1 : 1
        }
        state.itens.push(contatoNovo)
      }
    }
  }
})

export const { remover, editar, cadastrar } = contatosSlice.actions

export default contatosSlice.reducer
